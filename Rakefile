require "rubygems"
require "FileUtils"

desc "compress all the my jquery plugin"
task :build_jquery_plugin do
  builded_plugin = File.dirname(__FILE__) + "/builded_plugin.js"
  
  FileUtils.rm builded_plugin, :force => true 
  
  builded_file = File.open(builded_plugin, "w+")
  
  all_plugins = Dir["jquery.*.js"]
  
  builded_file.puts("/* Plugin list: ")
  all_plugins.each do |plugin|
    builded_file.puts("   * #{File.basename(plugin)}")
  end
  builded_file.puts("*/")
  
  
  all_plugins.each do |plugin|
    builded_file.puts "\n" * 5
    builded_file.puts("/" + "*" * 10 + plugin + "*" * 10 + "/")
    builded_file.puts File.readlines(File.dirname(__FILE__) + "/" + plugin)
  end
end