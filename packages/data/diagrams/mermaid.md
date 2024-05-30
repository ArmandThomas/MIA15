classDiagram
direction BT
class athletes {
   varchar(256) url
   varchar(256) full_name
   bigint unsigned first_edition
   smallint birth_year
   text bio
   bigint unsigned id
}
class countries {
   varchar(256) name
   varchar(4) code
   char(3) code_iso
   bigint unsigned id
}
class disciplines {
   varchar(256) name
   bigint unsigned id
}
class events {
   bigint unsigned id_discipline
   bigint unsigned id_Host
   varchar(256) name
   enum('men', 'women', 'mixed') gender
   bigint unsigned id
}
class host_disciplines {
   bigint unsigned id_discipline
   bigint unsigned id_host
}
class hosts {
   varchar(256) slug
   datetime start_date
   datetime end_date
   varchar(256) name
   enum('summer', 'winter') season
   smallint year
   bigint unsigned location
   bigint unsigned id
}
class results {
   enum('athlete', 'gameteam') participant_type
   varchar(256) value
   varchar(20) value_type
   tinyint(1) is_equality
   smallint position
   bigint unsigned id_event
   bigint unsigned id_country
   bigint unsigned id_athlete
   bigint unsigned id
}

athletes  -->  hosts : first_edition:id
events  -->  host_disciplines : id_discipline, id_Host:id_discipline, id_host
host_disciplines  -->  disciplines : id_discipline:id
host_disciplines  -->  hosts : id_host:id
hosts  -->  countries : location:id
results  -->  athletes : id_athlete:id
results  -->  countries : id_country:id
results  -->  events : id_event:id
