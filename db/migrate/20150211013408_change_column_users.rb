class ChangeColumnUsers < ActiveRecord::Migration
  def change
    remove_column :users, :token, :string
    add_column :users, :token, :string
  end
end
