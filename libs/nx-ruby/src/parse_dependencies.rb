#!/usr/bin/env ruby
# frozen_string_literal: true
require 'bundler'
require 'json'

nx_projects = JSON.parse(ARGV[0])

dependency_map = []

nx_projects.each do |project_name, project_root|
  Dir.chdir(project_root) do
    begin
      bundle = Bundler::LockfileParser.new(Bundler.read_file(Bundler.default_lockfile))
      dependency_map << [project_name, bundle.dependencies.keys.select { |name| name != project_name && nx_projects.keys.include?(name)}]
    rescue => exception
    end
  end
end

puts dependency_map.to_h.to_json
