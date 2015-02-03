class UpdateUsers < ActiveRecord::Migration
  def change
    add_column    :users, :username, :string, null: false
    change_column :users, :email,    :string, null: false
    change_column :users, :uid,      :string, null: false
    remove_column :users, :password_digest, :string, null: false  
  end
end
