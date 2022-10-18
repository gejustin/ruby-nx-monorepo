# frozen_string_literal: true

require_relative "b/version"

module Gem
  module B
    class Error < StandardError; end
        # Your code goes here...

        class Printer
          def self.print
            "Gem::B -> #{::Gem::A::Printer.print}"
          end
        end
  end
end
