#!/usr/bin/env node

var fs = require('fs');
var os = require('os');
var argv = require('minimist')(process.argv.slice(2));

/**
 * Everything in the file should be customized
 */

// Use `-d` or `--domain` to specify the domain
var domain = argv._[0] || argv.d || argv.domain;

// Use `-u` or `--user` to specify the domain
var user = argv._[1] || argv.s || argv.user;

// Use `-s` or `--server` to specify the domain
var server = argv._[2] || argv.s || argv.server;

// Use `-f` or `--file` to specify the source file
var file  = argv._[3] || argv.f || argv.file || domain + '.md';


if (!domain) {
  console.log('Please provide a domain (hampelmann.de), either as a first argument or with `-d`');
}

if (!user) {
  console.log('Please provide a user (hampel), either as a second argument or with `-u`');
}

if (!server) {
  console.log('Please provide a server (e.g. hampelmann.uberspace.de), either as a third argument or with `-s`');
}


/**
 * Application
 */


if(!fs.existsSync(file)) {
  fs.writeFileSync(file, '# Tasks\n\n');
}

var content = '';

function add (text) {
    if (text) {
        content = content.concat(text);
    }
    content = content.concat(os.EOL);
}

function write () {
    fs.writeFile(file, content, function (err) {
      if (err) {throw err;}
    });
}

/**
 * Content
 */
add('# ' + domain);
add('---');
add();

// ACCESS
add('## access');
add();
add('+ /home/' + user);
add('+ /var/www/virtual/' + user);
add();

add('### ssh');
add('```');
add('ssh ' + user + '@' + server);
add('```');
add();


add('### sftp');
add('```');
add('server: ' + server);
add('user: ' + user);
add('```');
add();

// DOMAIN
add('## domain');
add();

add('### register');
add('```');
add('uberspace-add-domain -d ' + domain + ' -w -m');
add('uberspace-add-domain -d *.' + domain + ' -w');
add('uberspace-add-domain -d www.' + domain + ' -w -m');
add('```');
add();

add('### list');
add('```');
add('dig ' +  domain + ' A +short');
add('```');
add();

add('### symlink');
add('```');
add('ln -s /var/www/virtual/' + user + '/' + domain + ' /var/www/virtual/' + user + '/www.' + domain);
add('```');
add();

// EMAIL
add('## email');
add();

add('### init');
add('```');
add('vsetup');
add('```');
add();

add('### add');
add('```');
add('vadduser hallo');
add('```');
add();

add('### add alias');
add('```');
add("echo 'my@address' > .qmail-webmaster");
add('```');
add();

add('### client config');
add('+ username: hallo@' + domain);
add('+ password: ');
add();
add('```');
add('// STARTTLS port:143, TLS port: 993');
add('imap.' + server);
add('// STARTTLS port:110, TLS port: 995');
add('pop3.' + server);
add('// STARTTLS port:587');
add('smtp.' + server);
add('```');
add();



write();
