class Issue < ActiveRecord::Base
  validates :title, :list_id, :ord, presence: true

  belongs_to :list
  has_many :issue_assignments, dependent: :destroy
  has_many :users, through: :issue_assignments
end
