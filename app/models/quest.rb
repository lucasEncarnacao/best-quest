class Quest < ApplicationRecord
  enum category: [:misc , :art, :history, :food]

  belongs_to :owner, class_name: "User", foreign_key: "user_id"
  has_many :steps
  has_many :completion_times
  has_many :conquerers, through: :completion_times, source: :user
  has_many :reviews
  has_many :reviewers, through: :reviews, source: :user
  has_many :lobbies

  validates :name, presence: true, uniqueness: true
  validates :category, presence: true
  validates :description, presence: true

  def avgRating
    ratings = reviews.map { |review| review.rating }
    ratingSum = ratings.reduce { |sum, rating| sum + rating }
    ratingSum.nil? ? nil : ratingSum / reviews.count
  end

  def avgTime
    times = completion_times.map { |completionTime| completionTime.sec }
    times = times.select { |time| !time.nil? } #remove nil times (players currently playing)
    timeSum = times.reduce { |sum, time| sum + time }
    avgSec = timeSum.nil? ? nil : timeSum / times.count
    
    formatAvgTime(avgSec)
  end

  def formatAvgTime(total_sec)
    if !total_sec.nil?
      hours = total_sec / 3600
      minutes = (total_sec / 60) % 60
      
      hour_s = hours == 1 ? nil : "s" 
      hours_str = hours > 0 ? "#{hours} hour#{hour_s}" : nil

      minutes = minutes > 0 ? minutes : 1
      min_s = minutes == 1 ? nil : "s"

      "#{hours_str} #{minutes} min#{min_s}"
    end
  end
end
