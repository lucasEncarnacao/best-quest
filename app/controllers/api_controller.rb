class ApiController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def encode_token(payload)
    JWT.encode(payload, ENV["ENCODER_KEY"])
  end

  def current_user
    decoded_hash = decode_token
    if !decoded_hash.nil? && !decoded_hash.empty? 
      user_id = decoded_hash.first["user_id"]
      User.find(user_id)
    else
      nil
    end
  end
  
  private
  
  def auth_header
    request.headers["Authorization"]
  end

  def decode_token
    if auth_header
      token = auth_header.split(' ').second
      begin
        JWT.decode(token, ENV["ENCODER_KEY"], true, algorithm: "HS256")
      rescue JWT::DecodeError
        ""
      end
    end
  end
end
