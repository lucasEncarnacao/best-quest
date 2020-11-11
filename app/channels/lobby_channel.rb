class LobbyChannel < ApplicationCable::Channel
  def subscribed
    stream_from "lobby_#{params[:lobby_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    lobby = Lobby.find(params[:lobby_id])
    completed = false
    
    if lobby.step_num < data["step_num"] #don't downgrade step_num
      if data["step_num"] > lobby.quest.steps.length
        completed = true
      else
        lobby.update(step_num: data["step_num"])
      end
    end

    ActionCable.server.broadcast(
      "lobby_#{params[:lobby_id]}", 
      { 
        completed: completed,
        start: data["start"],
      }
    )
  end
end
