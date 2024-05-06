//
//  AthleteModel.swift
//  SOLO-Testing
//
//  Created by Hannah Huynh on 5/3/24.
//

import Foundation


struct Athlete: Codable {
    var name: String
    var email: String
    var phoneNumber: String
    var profilePic: String
    var age: Int
    var gender: String
    var height: Double
    var weight: Double
    var affiliationId: Int

    // Example function to validate data before sending to the backend
    func isValid() -> Bool {
        return !name.isEmpty && email.contains("@") && phoneNumber.count >= 10
    }

    // Convert the model to a dictionary for a network request
    func toDictionary() -> [String: Any] {
        return [
            "name": name,
            "email": email,
            "phone_number": phoneNumber,
            "profile_pic": profilePic,
            "age": age,
            "gender": gender,
            "height": height,
            "weight": weight,
            "affiliation_id": affiliationId
        ]
    }
}