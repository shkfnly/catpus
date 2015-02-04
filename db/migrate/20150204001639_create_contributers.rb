class CreateContributers < ActiveRecord::Migration
  def change
    create_table :contributers do |t|
      t.integer :user_id
      t.integer :board_id
      t.timestamps null: false
    end
  end
end
