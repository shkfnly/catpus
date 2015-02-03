class User < ActiveRecord::Base
  # validates :username, :email, :password_digest, :session_token, presence: true
  validates :name, :email, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  attr_reader :password

  after_initialize :ensure_session_token

  def self.create_with_omniauth(auth)

    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth.info.name
      user.email = auth.info.email
      user.username = auth.info.nickname
      user.image_url = auth.info.image
      user.github_url = auth.info.urls.GitHub
      user.repos_url = auth.extra.raw_info.repos_url
      user.subscriptions_url = auth.extra.raw_info.received_events_url
      user.organizations = auth.extra.raw_info.organizations_url
      user.received_events_url = auth.extra.raw_info.received_events_url
    end
  end

  # def password=(password)
  #   @password = password
  #   self.password_digest = BCrypt::Password.create(password)
  # end

  # def self.find_by_credentials(name, password)
  #   user =  User.find_by(name: name)
  #   return nil unless user && user.is_password?(password)
  #   user
  # end
  
  def reset_session_token!
    self.session_token = generate_new_token
    self.save!
  end

  def generate_new_token
    SecureRandom::urlsafe_base64(16)
  end

  # def is_password?(password)
  #   BCrypt::Password.new(self.password_digest).is_password?(password)
  # end
  private
    def ensure_session_token
      self.session_token ||= generate_new_token
    end
end


