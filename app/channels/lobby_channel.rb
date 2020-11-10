class LobbyChannel < ApplicationCable::Channel
  def subscribed
    stream_from "lobby_#{params[:lobby_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    ActionCable.server.broadcast("lobby_#{params[:lobby_id]}", {message: "testingg"})
  end
end
