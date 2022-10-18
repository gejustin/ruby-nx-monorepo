# frozen_string_literal: true

require_relative "a/version"

module Gem
  module A
    class Error < StandardError; end
    # Your code goes here...

    class Printer
      def self.print
        'Gem::A'
      end
    end
  end
end
