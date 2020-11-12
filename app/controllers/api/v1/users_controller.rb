class Api::V1::UsersController < ApiController
  def create
    user = User.new(user_params) 

    if user.save
      payload = { user_id: user.id }
      jwt_token = encode_token(payload)
      render json: { username: user.username, jwt_token: jwt_token }
    else
      render json: { errors: user.errors.full_messages.to_sentence }
    end
  end

  def sign_in
    user = User.find_by(username: user_params[:username])

    if user && user.authenticate(user_params[:password])
      payload = { user_id: user.id }
      jwt_token = encode_token(payload)
      render json: { username: user.username, jwt_token: jwt_token }
    else
      render json: { error: "Log in failed! Username or password invalid!" }
    end
  end

  def auto_sign_in
    if current_user
      render json: current_user
    else
      render json: { error: "No user signed in" }
    end
  end

  private 

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
