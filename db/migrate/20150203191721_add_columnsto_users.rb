class AddColumnstoUsers < ActiveRecord::Migration
  def change
    add_column :users, :image_url, :string
    add_column :users, :github_url, :string
    add_column :users, :repos_url, :string
    add_column :users, :subscriptions_url, :string
    add_column :users, :organizations, :string
    add_column :users, :received_events_url, :string
  end
end
