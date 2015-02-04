class RemoveColumnsFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :image_url, :string
    remove_column :users, :github_url, :string
    remove_column :users, :repos_url, :string
    remove_column :users, :subscriptions_url, :string
    remove_column :users, :organizations, :string
    remove_column :users, :received_events_url, :string
  end
end
