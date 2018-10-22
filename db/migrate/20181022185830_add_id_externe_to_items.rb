class AddIdExterneToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :id_externe, :string
  end
end
