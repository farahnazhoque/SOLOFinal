import Foundation

struct NetworkService {
    let baseUrl = "http://localhost:3000" // Replace with your server's actual base URL

    func signUpAthlete(_ athlete: Athlete, completion: @escaping (Result<String, Error>) -> Void) {
        let signUpEndpoint = "\(baseUrl)/sign-up-athlete"
        guard let url = URL(string: signUpEndpoint) else { return }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")

        do {
            let jsonData = try JSONEncoder().encode(athlete)
            request.httpBody = jsonData

            let task = URLSession.shared.dataTask(with: request) { data, response, error in
                guard let httpResponse = response as? HTTPURLResponse else {
                    DispatchQueue.main.async {
                        completion(.failure(APIError.responseProblem)) // Consider enhancing this with more info
                    }
                    return
                }

                if let error = error {
                    print("Network Error: \(error.localizedDescription), HTTP Status Code: \(httpResponse.statusCode)")
                    DispatchQueue.main.async {
                        completion(.failure(APIError.networkError(description: error.localizedDescription)))
                    }
                    return
                }

                guard (200...299).contains(httpResponse.statusCode), let responseData = data else {
                    print("API responded with status code \(httpResponse.statusCode), Response: \(String(describing: String(data: data ?? Data(), encoding: .utf8)))")
                    DispatchQueue.main.async {
                        completion(.failure(APIError.fromStatusCode(httpResponse.statusCode)))
                    }
                    return
                }

                if let resultString = String(data: responseData, encoding: .utf8) {
                    DispatchQueue.main.async {
                        completion(.success(resultString))
                    }
                } else {
                    DispatchQueue.main.async {
                        completion(.failure(APIError.decodingProblem))
                    }
                }
            }
            task.resume()
        } catch {
            DispatchQueue.main.async {
                completion(.failure(error))
            }
        }
    }


    func updateAthlete(id: Int, athlete: Athlete, completion: @escaping (Result<Athlete, APIError>) -> Void) {
        let updateEndpoint = "\(baseUrl)/update-athlete/\(id)"
        guard let url = URL(string: updateEndpoint) else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "PUT"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")

        do {
            let jsonData = try JSONEncoder().encode(athlete)
            request.httpBody = jsonData

            let task = URLSession.shared.dataTask(with: request) { data, response, error in
                guard let data = data, error == nil else {
                    completion(.failure(.responseProblem))
                    return
                }

                do {
                    let decodedResponse = try JSONDecoder().decode(Athlete.self, from: data)
                    completion(.success(decodedResponse))
                } catch {
                    completion(.failure(.decodingProblem))
                }
            }

            task.resume()
        } catch {
            completion(.failure(.otherProblem(error)))
        }
    }

    func getAthlete(id: Int, completion: @escaping (Result<Athlete, APIError>) -> Void) {
        let getEndpoint = "\(baseUrl)/athlete/\(id)"
        guard let url = URL(string: getEndpoint) else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "GET"

        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data, error == nil else {
                completion(.failure(.responseProblem))
                return
            }

            do {
                let decodedResponse = try JSONDecoder().decode(Athlete.self, from: data)
                completion(.success(decodedResponse))
            } catch {
                completion(.failure(.decodingProblem))
            }
        }

        task.resume()
    }

    func deleteAthlete(id: Int, completion: @escaping (Result<Void, APIError>) -> Void) {
        let deleteEndpoint = "\(baseUrl)/athlete/\(id)"
        guard let url = URL(string: deleteEndpoint) else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"

        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let httpResponse = response as? HTTPURLResponse, error == nil else {
                completion(.failure(.responseProblem))
                return
            }

            if httpResponse.statusCode == 200 {
                completion(.success(()))
            } else {
                completion(.failure(.responseProblem))
            }
        }

        task.resume()
    }

    // Helper method to handle response data
    private func handleResponse<T: Decodable>(data: Data?, response: URLResponse?, error: Error?, completion: @escaping (Result<T, APIError>) -> Void) {
        guard let data = data, error == nil else {
            completion(.failure(.responseProblem))
            return
        }

        do {
            let decodedResponse = try JSONDecoder().decode(T.self, from: data)
            completion(.success(decodedResponse))
        } catch {
            completion(.failure(.decodingProblem))
        }
    }
    private func performRequest<T: Decodable>(url: URL, method: String, body: Data? = nil, completion: @escaping (Result<T, APIError>) -> Void) {
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = body

        URLSession.shared.dataTask(with: request) { data, response, error in
            guard let httpResponse = response as? HTTPURLResponse,
                  error == nil,
                  (200...299).contains(httpResponse.statusCode),
                  let data = data else {
                let statusCode = (response as? HTTPURLResponse)?.statusCode ?? 0
                completion(.failure(APIError.fromStatusCode(statusCode)))
                return
            }

            do {
                let decodedResponse = try JSONDecoder().decode(T.self, from: data)
                DispatchQueue.main.async {
                    completion(.success(decodedResponse))
                }
            } catch {
                DispatchQueue.main.async {
                    completion(.failure(.decodingProblem))
                }
            }
        }.resume()
    }

}
