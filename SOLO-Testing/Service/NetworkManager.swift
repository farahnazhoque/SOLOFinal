//
//  NetworkManager.swift
//  SOLO-Testing
//
//  Created by Hannah Huynh on 5/3/24.
//

import Foundation

class NetworkManager {
    static let shared = NetworkManager()
    let baseUrl = "http://localhost:3000"

    func registerAthlete(jsonData: Data, completion: @escaping (Bool, String) -> Void) {
        guard let url = URL(string: "\(baseUrl)/sign-up-athlete") else {
            completion(false, "Invalid URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = jsonData  // jsonData is already of type Data
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
                completion(false, "Error: Invalid response from server")
                return
            }
            
            if let error = error {
                completion(false, "Error: \(error.localizedDescription)")
            } else {
                completion(true, "Athlete registered successfully!")
            }
        }
        task.resume()
    }
}
