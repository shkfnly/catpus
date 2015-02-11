class AddAvatarUrlToUsers < ActiveRecord::Migration
  def change
    add_column :users, :avatar_url, :string, default: "http://www.gravatar.com/avatar"
  end
end
