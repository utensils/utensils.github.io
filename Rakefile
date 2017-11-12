class String
  def shuffle
    split('').shuffle.join
  end

  def shuffle!
    replace shuffle
  end
end

msg = "jekyll-namesake"

task :default do
  msg = "#{msg}\nFeel free to run a task for more instructions."
  system "echo #{msg}"
  system "rake --tasks"
end

desc 'Generate an encoded email address to stop spammers'
task :email do
  puts 'Please type in an email address then press ENTER/RETURN'
  address = STDIN.gets.chomp.downcase
  key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  key.shuffle!
  puts "\nInstallation:\nUpdate `_config.yml` with freshly generated email-key, and email-encoded.\n\nemail-key: #{key}"

  scrambled = ''
  shift = address.length
  (0..shift-1).each do |i|
    if key.index(address[i]) == nil
  		scrambled += address[i]
    else
      chr = (key.index(address[i]) + shift) % key.length
  		scrambled += key[chr]
    end
  end
  puts "email-encoded: #{scrambled}\n"
end
