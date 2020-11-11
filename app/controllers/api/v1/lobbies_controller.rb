class Api::V1::LobbiesController < ApiController
  def create
    lobby = Lobby.new(code: gen_code)
    lobby.quest = Quest.find(params["quest_id"])

    if lobby.save
      render json: lobby
    else
      render json: { error: lobby.errors.full_messages.to_sentence }
    end
  end

  def show
    lobby = Lobby.find_by(code: params["id"])

    if !lobby.nil?
      render json: lobby
    else
      render json: { error: "Could not find lobby" }
    end
  end

  private

  def gen_code
    charset = Array('A'..'Z')
    code = Array.new(4) { charset.sample }.join

    #generate unique code
    if Lobby.where(code: code).length > 0 
      gen_code
    else
      code
    end
  end
end
