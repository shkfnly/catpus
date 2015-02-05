class AddPushedAtToRepositories < ActiveRecord::Migration
  def change
    add_column :repositories, :pushed_at, :datetime, null: false
  end
end
