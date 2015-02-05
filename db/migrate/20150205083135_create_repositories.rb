class CreateRepositories < ActiveRecord::Migration
  def change
    create_table :repositories do |t|
      t.integer :github_id, null: false
      t.integer :user_id, null: false
      t.string :name, null: false
      t.string :description
      t.string :url, null: false
      t.string :html_url, null: false


      t.timestamps null: false
    end
  end
end
