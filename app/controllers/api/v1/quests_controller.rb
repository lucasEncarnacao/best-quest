class Api::V1::QuestsController < ApiController
  skip_before_action :verify_authenticity_token, :only => :create

  def index
    render json: Quest.all
  end

  def show
    quest = Quest.find(params[:id])
    render json: quest, serializer: QuestShowSerializer
  end

  def create
    quest = Quest.new(quest_params)
    quest.owner = current_user
    
    steps = steps_params.map.with_index do |step_params, index|
      new_step = Step.new(step_params)
      new_step.step_num = index + 1
      new_step.quest = quest
      new_step
    end

    if quest.valid?
      if steps.all?{|step| step.valid?}
        quest.save
        steps.each {|step| step.save}
        
        render json: quest, serializer: QuestShowSerializer
      else
        bad_steps = steps.select{|step| !step.valid?}

        error_messages = bad_steps.map {|bad_step| bad_step.errors.full_messages}
        
        render json: { errors: error_messages.flatten.to_sentence }
      end
    else
      render json: { errors: quest.errors.full_messages.to_sentence }
    end
  end

  private

  def quest_params
    params.permit(:name, :category, :description)
  end

  def steps_params
    params_array = []
    accepted_keys = ["lat", "lng", "clue", "hint", "description", "photo"]
    # convert params from {"lat_0": 123, "lat_1": 234} to [{lat: 123}, {lat: 234}]
    params.keys.each do |key|
      keyStr = key.split("_").first
      keyIndex = key.split("_").second
      
      if accepted_keys.include?(keyStr) && !keyIndex.nil?
        keyIndex = keyIndex.to_i
        
        if params_array[keyIndex].nil?
          params_array[keyIndex] = {}
        end

        params_array[keyIndex][keyStr] = params[key]
      end
    end
    
    params_array
  end
end
