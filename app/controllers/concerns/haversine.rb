module Haversine
  EARTH_RADIUS = 3958.8 #radius of the Earth in miles
  
  def haversine_dist(lat_1, lng_1, lat_2, lng_2)
    #Haversine distance formula
    #Calculates great circle distance between 2 points on a sphere
    lat_diff = to_rad(lat_1) - to_rad(lat_2)
    lng_diff = to_rad(lng_1) - to_rad(lng_2)

    dist = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(hav(lat_diff) + Math.cos(to_rad(lat_1)) * Math.cos(to_rad(lat_2)) * hav(lng_diff)))
  end

  def to_ft(miles)
    miles * 5280
  end

  def hav(diff)
    Math.sin(diff / 2) ** 2
  end

  def to_rad(deg)
    deg * (Math::PI / 180)
  end
end
