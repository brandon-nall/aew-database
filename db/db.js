const pg = require('pg');
const uuid = require('uuid/v4');
const client = require('./client');
const faker = require('faker');
const axios = require('axios');
require('dotenv').config();

const models = ({ wrestlers, matches } = require('./models'));

const client_id = process.env.CLIENT_ID;

const sync = async () => {
  if (process.env.NODE_ENV == 'production') {
    //**********************************  PRODUCTION ******************************* */
    console.log('environment is: ', process.env.NODE_ENV);
    const SQL = `    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE TABLE IF NOT EXISTS wrestlers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR
  );

  `;
    await client.query(SQL);
  } else {
    /**********************************  DEVELOPMENT *******************************/
    console.log('environment is: development');
    const SQL = `    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";




  DROP TABLE IF EXISTS wrestlers;
  DROP TABLE IF EXISTS matches;
  DROP TABLE IF EXISTS factions;
  CREATE TABLE IF NOT EXISTS wrestlers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR,
    debut VARCHAR,
    image VARCHAR
  );
  CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date VARCHAR,
  event VARCHAR,
  type VARCHAR,
  championship VARCHAR,
  winner VARCHAR,
  participants TEXT[], teams text[]
  );
  CREATE TABLE IF NOT EXISTS factions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR,
    type VARCHAR,
    members text[],
    image VARCHAR
  );

  INSERT INTO wrestlers (name, debut, image) VALUES ('MJF', '2019-05-02', 'https://www.wrestling-world.com/imgs/4038/maxwell-jacob-friedman-on-his-quick-victory.jpg'), ('Cody', '2019-05-02', 'https://i0.wp.com/thefanboyseo.com/wp-content/uploads/2019/03/IMG_20190322_110808.jpg'), ('Dustin Rhodes', '2019-05-02', 'https://img.bleacherreport.net/img/images/photos/003/828/914/f555ab7ddfbabe9c0d62ad4339c8dcf5_crop_north.jpg?1568863651&w=630&h=420'), ('Chris Jericho', '2019-05-02', 'https://www.ewrestlingnews.com/wp-content/uploads/2020/02/Chris-Jericho-4.jpg'), ('Kenny Omega', '2019-05-02', 'https://miro.medium.com/max/2600/1*doaM-B5h4HFMeMHaRTEfdQ.jpeg'), ('Adam Page', '2019-05-02', 'https://images.daznservices.com/di/library/sporting_news/dd/16/adam-page-wrestling-ring-of-honor-ftr-051117_1cst2s7mxxqsv1b3o1xtsu0z0c.jpg'), ('Riho', '2019-05-02', 'https://i.pinimg.com/originals/44/0c/8d/440c8d8b736dea726b118c89e0b06bf8.jpg'), ('Nyla Rose', '2019-05-02', 'https://bloximages.newyork1.vip.townnews.com/ucanews.live/content/tncms/assets/v3/editorial/c/0a/c0a87c90-5c14-11ea-8efd-6f50a8e22c8b/5e5c4651e1a79.image.jpg'), ('Hikaru Shida', '2019-05-02', 'https://pbs.twimg.com/media/D7ldHSOUwAAu0Er.jpg'), ('Dr. Britt Baker D.M.D', '2019-05-02', 'https://vignette.wikia.nocookie.net/prowrestling/images/0/06/Britt_Baker_-_1578803.jpg/revision/latest/top-crop/width/360/height/450?cb=20191019180109'), ('Pentagon Jr', '2019-05-02', 'https://cdn.vox-cdn.com/thumbor/7y73Ik7jmIUGZN7gBW2wQKIflHA=/0x57:1000x724/1310x873/cdn.vox-cdn.com/uploads/chorus_image/image/65169514/tumblr_pwwyprU2Ng1tyujquo1_1280.0.0.jpg'), ('Rey Fenix', '2019-05-02', 'https://vignette.wikia.nocookie.net/impact/images/6/68/Fenix.jpg'), ('Awesome Kong', '2019-05-02', 'https://lastwordonprowrestling.com/wp-content/uploads/sites/15/2019/02/Awesome-Kong-e1549674383190.png'), ('Allie', '2019-05-02', 'https://66.media.tumblr.com/b79a864829c78df25cf2113a28609216/tumblr_pzfr7aysZQ1rmv1vdo2_500.png'), ('Leva Bates', '2019-06-29', 'https://i1.wp.com/prowrestlingpost.com/wp-content/uploads/2019/09/AEW-Leva-Bates-0.jpg'), ('Christopher Daniels', '2019-05-02', 'https://static.wixstatic.com/media/94b54e_5252053872db431d920f2a5df1e6a488~mv2_d_5568_3712_s_4_2.jpg/v1/fill/w_1000,h_667,al_c,q_90,usm_0.66_1.00_0.01/94b54e_5252053872db431d920f2a5df1e6a488~mv2_d_5568_3712_s_4_2.jpg'), ('Cima', '2019-05-02','https://pbs.twimg.com/media/EFflWuUWoAMquud.jpg'), ('Kip Sabian', '2019-05-02', 'https://cdn1.sixthman.net/sixthman/images/artists/5124.jpg'), ('Sammy Guevara', '2019-05-02', 'https://creator-images.podchaser.com/429a8bddc1a31881cf75611e3dbaec7a.jpeg'), ('Shawn Spears', '2019-05-02', 'https://static3.cbrimages.com/wordpress/wp-content/uploads/2020/05/Shawn-Spears.jpg'), ('Joey Janela', '2019-05-02', 'https://pbs.twimg.com/profile_images/1248885938467586048/v3PYfDrl_400x400.jpg'), ('Billy Gunn', '2019-05-02', 'https://www.wrestlezone.com/assets/uploads/2019/11/11-20-19_INDIANAPOLIS__2019-11-20-20-27-16__photo-by-Lee-South-e1574995323323.jpg'), ('Luchasaurus', '2019-05-02', 'https://statics.sportskeeda.com/editor/2019/10/457e2-15714470982174-500.jpg'),  ('Jungle Boy', '2019-05-02', 'https://popculthq.com/wp-content/uploads/2020/01/Jungle-Boy.jpg'), ('Orange Cassidy', '2019-05-02', 'https://static3.cbrimages.com/wordpress/wp-content/uploads/2020/05/Orange-Cassidy-Facebook-Image.jpg'), ('Jimmy Havoc', '2019-05-02', 'https://static.tvtropes.org/pmwiki/pub/images/wrestling_jimmy_havoc.jpg'), ('Darby Allin', '2019-06-29', 'https://vignette.wikia.nocookie.net/retconwrestling/images/2/29/DAllin.jpg'), ('Michael Nakazawa', '2019-06-29', 'https://cdn.gouki.com/dtbimages/01580199-15e2-4594-b578-2df5869763cb.png'), ('Jon Moxley', '2019-06-29', 'https://411mania.com/wp-content/uploads/2020/03/AEW-Dynamite-Jon-Moxley-645x370.jpg'), ('Yuka Sakazaki', '2019-06-29', 'https://411mania.com/wp-content/uploads/2020/02/Yuka-Sakazaki-AEW.jpg'), ('Lance Archer', '2020-04-01', 'https://s3.superluchas.com/2020/03/Lance-Archer-od.jpg'), ('Santana', '2020-03-09', 'https://vignette.wikia.nocookie.net/prowrestling/images/4/45/Draz_LAX.jpg'), ('Ortiz', '2020-03-09', 'https://vignette.wikia.nocookie.net/impact/images/4/41/Ortiz.jpg'), ('Frankie Kazarian', '2019-05-02', 'https://i.pinimg.com/originals/bb/d8/57/bbd857b4a8463e8c8fa93db3ec85a467.jpg'), ('Scorpio Sky', '2019-05-02', 'https://pbs.twimg.com/media/Cx6XjQpUoAA_e3Z.jpg'), ('Jake Hager', '2019-10-02', 'https://cdn.sescoops.com/wp-content/uploads/2020/05/jake-hager-696x392.jpg'), ('Nick Jackson', '2019-05-02', 'https://www.fite.tv/thumbs/s3/ims-thumbs/fighters_images/AEW/Nick_Jackson/Nick_Jackson_New.jpg'), ('Matt Jackson', '2019-05-02', 'https://www.fite.tv/thumbs/s3/ims-thumbs/fighters_images/AEW/Matt_Jackson/Matt_Jackson_New.jpg'), ('Marko Stunt', '2019-05-02', 'https://cdn1.sixthman.net/sixthman/images/artists/5106.jpg'), ('Pac', '2019-08-31', 'https://smirfittsspeech.files.wordpress.com/2019/07/img_4904.jpg') ;

  INSERT INTO matches (date, type, event, championship, winner, participants, teams) VALUES ('2019-05-25', 'Fatal Four Way', 'Double or Nothing', null, 'Dr. Britt Baker D.M.D', ARRAY['Dr. Britt Baker D.M.D', 'Nyla Rose', 'Kylie Rae', 'Awesome Kong'], null), ('2019-05-25', 'Singles', 'Double or Nothing', null, 'Cody', ARRAY['Cody', 'Dustin Rhodes'], null), ('2019-06-29', 'Singles', 'Fyter Fest', null, 'Allie', ARRAY['Allie', 'Leva Bates'], null), ('2019-06-29', 'Singles', 'Fyter Fest', null, 'Cima', ARRAY['Cima', 'Christopher Daniels'], null), ('2019-05-25', 'Singles', 'Double or Nothing', null, 'Kip Sabian', ARRAY['Kip Sabian', 'Sammy Guevara'], null), ('2020-02-29', 'Singles', 'Revolution', 'World Championship', 'Jon Moxley', ARRAY['Chris Jericho', 'Jon Moxley'], null), ('2019-06-29', 'Singles', 'Fyter Fest', null,  'Cody', ARRAY['Cody', 'Darby Allin'], null), ('2019-08-31', 'Singles', 'All Out', 'World Championship', 'Chris Jericho', ARRAY['Chris Jericho', 'Adam Page'], null), ('2019-10-02', 'Singles', 'Wednesday Night Dynamite', 'Women''s World Championship', 'Riho', ARRAY['Riho', 'Nyla Rose'], null), ('2020-02-12', 'Singles', 'Wednesday Night Dynamite', 'Women''s World Championship', 'Nyla Rose', ARRAY['Riho', 'Nyla Rose'], null), ('2020-05-23', 'Singles', 'Double or Nothing', 'Women''s World Championship', 'Hikaru Shida', ARRAY['Nyla Rose', 'Hikaru Shida'], null), ('2020-05-23', 'Singles', 'Double or Nothing', 'TNT Championship', 'Cody', ARRAY['Cody', 'Lance Archer'], null), ('2019-08-31', 'Singles', 'All Out', null, 'Pac', ARRAY['Kenny Omega', 'Pac'], null), ('2019-08-31', 'Singles', 'All Out', 'Women''s World Championship', 'Riho', ARRAY['Riho', 'Hikaru Shida'], null), ('2019-08-31', 'Singles', 'All Out', null, 'Cody', ARRAY['Cody', 'Shawn Spears'], null), ('2019-07-13', 'Singles', 'Fight for the Fallen', null, 'Kenny Omega', ARRAY['Kenny Omega', 'Cima'], null), ('2019-11-09', 'Singles', 'Full Gear', null, 'Adam Page', ARRAY['Adam Page', 'Pac'], null), ('2019-11-09', 'Singles', 'Full Gear', null, 'Shawn Spears', ARRAY['Shawn Spears', 'Joey Janela'], null), ('2019-11-09', 'Singles', 'Full Gear', 'World Championship', 'Chris Jericho', ARRAY['Chris Jericho', 'Cody'], null), ('2020-02-29', 'Singles', 'Revolution', null, 'Jake Hager', ARRAY['Dustin Rhodes', 'Jake Hager'], null), ('2020-02-29', 'Singles', 'Revolution', null, 'Darby Allin', ARRAY['Darby Allin', 'Sammy Guevara'], null), ('2020-02-29', 'Singles', 'Revolution', null, 'Pac', ARRAY['Orange Cassidy', 'Pac'], null),('2020-05-23', 'Singles', 'Double or Nothing', null, 'MJF', ARRAY['MJF', 'Jungle Boy'], null), ('2019-05-25', 'Tag Team', 'Double or Nothing', 'AAA World Tag Team Championship', 'The Young Bucks', ARRAY['Matt Jackson', 'Nick Jackson', 'Pentagon Jr', 'Rey Fenix'], ARRAY['The Young Bucks', 'Lucha Bros']), ('2019-05-25', 'Tag Team', 'Double or Nothing', null, 'SCU', ARRAY['Frankie Kazarian', 'Scorpio Sky', 'Christopher Daniels', 'Cima', 'T-Hawk', 'El Lindaman'], ARRAY['SCU', 'Strong Hearts']), ('2019-05-25', 'Singles', 'Double or Nothing', null, 'Chris Jericho', ARRAY['Chris Jericho', 'Kenny Omega'], null), ('2019-10-30', 'Tag Team', 'Wednesday Night Dynamite', 'Tag Team World Championship', 'SCU', ARRAY['Frankie Kazarian', 'Scorpio Sky', 'Pentagon Jr', 'Rey Fenix'], ARRAY['SCU', 'Lucha Bros']), ('2020-01-21', 'Tag Team', 'Chris Jericho''s Rock ''N'' Wrestling Rager at Sea Part Deux: Second Wave', 'Tag Team World Championship', 'Kenny Omega & Adam Page', ARRAY['Frankie Kazarian', 'Scorpio Sky', 'Kenny Omega', 'Adam Page'], ARRAY['SCU', 'Kenny Omega & Adam Page']);

  INSERT INTO factions (name, type, members, image) VALUES ('Lucha Bros', 'Tag Team', ARRAY['Pentagon Jr', 'Rey Fenix'], 'https://cdn.sescoops.com/wp-content/uploads/2019/02/lucha-bros-696x392.jpg'), ('Proud and Powerful', 'Tag Team', ARRAY['Santana', 'Ortiz'], 'https://66.media.tumblr.com/f71a9451ad4ba875526da8b024da2fc8/79a1de71c0fe39cc-65/s640x960/a06820a8cf017a960d0432cb995d1a4a0d6787dd.jpg'), ('SCU', 'Tag Team', ARRAY['Christopher Daniels', 'Scorpio Sky', 'Frankie Kazarian'], 'https://static0.cbrimages.com/wordpress/wp-content/uploads/2020/05/SCU.jpg'), ('The Young Bucks', 'Tag Team', ARRAY['Matt Jackson', 'Nick Jackson'], 'https://zonawrestling.net/wp-content/uploads/2020/01/08/aew-double-nothing-young-bucks-matt-nick-jackson-interview.jpg'), ('The Inner Circle', 'Faction', ARRAY['Chris Jericho', 'Sammy Guevara', 'Jake Hager', 'Santana', 'Ortiz'], 'https://theovertimer.com/wp-content/uploads/2020/03/01-the-inner-circle-chris-jericho-aew-89.jpg'), ('The Elite', 'Faction', ARRAY['Cody', 'Kenny Omega', 'Matt Jackson', 'Nick Jackson', 'Adam Page'], 'https://www.monstersandcritics.com/wp-content/uploads/2020/02/The-Elite-in-AEW-2.jpg'), ('Jurassic Express', 'Tag Team', ARRAY['Jungle Boy', 'Luchasaurus', 'Marko Stunt'], 'https://vignette.wikia.nocookie.net/mcuff/images/a/a3/8ed9c8fb4a2ace0f-600x338.jpg'), ('Best Friends', 'Tag Team', ARRAY['Chuck Taylor', 'Trent Beretta'], 'https://i0.wp.com/prowrestlingpost.com/wp-content/uploads/2019/12/AEW-Best-Friends-1.jpg'), ('Le Sex Gods', 'Tag Team', ARRAY['Chris Jericho', 'Sammy Guevara'], 'https://www.ringsidenews.com/wp-content/uploads/2019/12/chris-jericho-sammy-guevara-842.png'), ('Kenny Omega & Adam Page', 'Tag Team', ARRAY['Kenny Omega', 'Adam Page'], 'https://i.pinimg.com/originals/41/7b/8e/417b8e0fc2ed497c8a7500d504a0bfe2.jpg');

  `;

    await client.query(SQL);
  }
};

module.exports = {
  sync,
  models,
};
