class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.integer :card_id, null: false
      t.float :ord, default: 0.0
      t.integer :user_id
      t.timestamps null: false
    end
  end
end
