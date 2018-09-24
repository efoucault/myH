class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :titre
      t.integer :note
      t.text :commentaire
      t.integer :age
      t.string :artiste
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
