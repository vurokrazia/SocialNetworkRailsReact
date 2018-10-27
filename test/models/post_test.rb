# == Schema Information
#
# Table name: posts
#
#  id               :integer          not null, primary key
#  html_content     :text
#  markdown_content :text             not null
#  user_id          :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

require 'test_helper'

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
