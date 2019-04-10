class Message < ApplicationRecord

  belongs_to :user
  belongs_to :group

  validates :content, presense: true, unless: image?
end
