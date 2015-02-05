class AddColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :fresh, :boolean, default: true
  end
end
