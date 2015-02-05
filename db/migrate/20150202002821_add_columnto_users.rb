class AddColumntoUsers < ActiveRecord::Migration
  def change
    add_column :users, :provider, :string, default: "github"
    add_column :users, :uid, :string, null: false
  end
end
