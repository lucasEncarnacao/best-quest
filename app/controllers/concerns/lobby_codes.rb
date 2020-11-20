module LobbyCodes
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
