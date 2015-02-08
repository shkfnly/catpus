class Task < ActiveRecord::Base
  belongs_to :user
  belongs_to :card
end
