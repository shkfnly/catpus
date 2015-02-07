class User < ActiveRecord::Base
  validates :username, :email, :name, :uid, presence: true
  validates :name, :email, uniqueness: true

  has_many :boards
  has_many :cards
  has_many :repositories
  has_many :issues
  has_many :board_memberships
  has_many :contrib_boards, through: :board_membership
  
  attr_reader :password

  after_initialize :ensure_session_token

  def self.create_with_omniauth(auth)
    create! do |user|
      user.token = auth.credentials.token
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth.info.name
      user.email = auth.info.email
      user.username = auth.info.nickname
    end
  end
  
  def reset_session_token!
    self.session_token = generate_new_token
    self.save!
  end

  def generate_new_token
    SecureRandom::urlsafe_base64(16)
  end

  private
    def ensure_session_token
      self.session_token ||= generate_new_token
    end
end


