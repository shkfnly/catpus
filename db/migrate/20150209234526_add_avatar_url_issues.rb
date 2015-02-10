class AddAvatarUrlIssues < ActiveRecord::Migration
  def change
    add_column :issues, :avatar_url, :string
  end
end
