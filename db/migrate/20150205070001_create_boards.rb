class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.string   :title,          null: false
      t.integer  :user_id,        null: false
      t.string   :repository_url, null: false
      t.integer  :repository_id,  null: false
      t.timestamps null: false
    end
  end
end
