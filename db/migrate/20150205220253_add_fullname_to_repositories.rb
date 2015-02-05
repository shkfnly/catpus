class AddFullnameToRepositories < ActiveRecord::Migration
  def change
    add_column :repositories, :full_name, :string, null: false
  end
end
