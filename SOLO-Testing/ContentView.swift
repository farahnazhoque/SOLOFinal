//
//  ContentView.swift
//  SOLO-Testing
//
//  Created by Serena Huang on 2/13/24.
//

import SwiftUI

class UserSettings: ObservableObject {
    @Published var loggedIn : Bool = false
    @Published var navigateNowToLogIn: Bool = false
    @Published var navigateNowToSignup: Bool = false
    @Published var navigateNowToCompletion: Bool = false
    @Published var navigateNowToAddAthlete: Bool = false
    
    @Published var username: String = ""
    @Published var password: String = ""
    @Published var phone_number:String = ""
    @Published var profile_image:String = ""
    
    // other variables to track
    @Published var isAthlete:Bool = false
    @Published var isCoach:Bool = false
    
    
}

struct StartView: View {
    @EnvironmentObject var settings: UserSettings
    
    var body: some View {
        if settings.loggedIn {
            return AnyView(TabBarView())
        }else {
            return AnyView(ContentView())
        }
    }
}

struct ContentView: View {
    @EnvironmentObject var settings: UserSettings
    
    var body: some View {
    GeometryReader { geometry in
        NavigationView {
                ZStack {
                    NavigationLink(destination: LogInView(), isActive: self.$settings.navigateNowToLogIn) { EmptyView() }
                    
                    NavigationLink(destination: SignUpCompletionView() .navigationBarBackButtonHidden(true), isActive: self.$settings.navigateNowToCompletion) {
                        EmptyView() }
//                    NavigationLink(destination: SignUpView(), isActive: self.$settings.navigateNowToSignup) { EmptyView() }
                    
                    OnboardingView()
    
                }
            }
        }
    }
}

struct OnboardingView: View {
    @EnvironmentObject var settings: UserSettings
    
    var body: some View {
        VStack{
                Image("solo-logo")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width:200, height:200)
            VStack {
                Text("SOLO")
                    .multilineTextAlignment(.trailing)
                    .font(Font.custom("Poppins-SemiBold", size: 48))
                
                Text("Connect, Train, Workout").font(Font.custom("Poppins-Regular", size:16))
            }
            .offset(y: -50)
            
            Button(action: {
               self.settings.navigateNowToLogIn = true
            }) {
                   HStack {
                       Text("Log In").font(Font.custom("Poppins-Medium", size: 18))
                   }.frame(width: 300, height: 40)
                   .foregroundColor(Color(.white))
                   .background(Color(red: 0.208, green: 0.298, blue: 0.804)) // #354ccd
                   .cornerRadius(10)
                   .padding(.bottom, 5)
               }
            
            Button(action: {
                    self.settings.navigateNowToSignup = true
                    }) {
                    HStack {
                           Text("Create an Account").font(Font.custom("Poppins-Medium", size: 18))
                    }.frame(width: 300, height: 40)
                      .foregroundColor(Color(red: 0.208, green: 0.298, blue: 0.804))
                      .background(Color(.white))
                      .cornerRadius(10)
               }
                    .sheet(isPresented: self.$settings.navigateNowToSignup) {
                    SignUpView()
                }
        }
        
    }
}

#Preview {
    StartView().environmentObject(UserSettings())

}
