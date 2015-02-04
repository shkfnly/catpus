class List < ActiveRecord::Base
  validates :title, :board_id, :ord, presence: true

  belongs_to :board
  has_many :cards, dependent: :destroy
end
