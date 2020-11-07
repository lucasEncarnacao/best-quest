class CompletionTimeSerializer < ActiveModel::Serializer
  attributes :completionTime 

  def completionTime
    total_sec = object.sec    
    hours = total_sec / 3600
    minutes = (total_sec / 60) % 60 
    sec = total_sec % 60
    sprintf("%02d:%02d:%02d", hours, minutes, sec)
  end
end
