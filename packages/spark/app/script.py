# -*- coding: utf-8 -*-
import numpy as np
import pandas as pd
import pyspark.pandas as ps

from pyspark.sql import SparkSession
spark = SparkSession.builder.master("local[*]").getOrCreate()
spark.conf.set("spark.sql.repl.eagerEval.enabled", True) # Property used to format output tables better

from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("Olympic Data Processing") \
    .getOrCreate()

df_athletes = ps.read.json('app/data/input/olympic_athletes.json')
xml_file_path = 'app/data/input/olympic_hosts.xml'
df_hosts = spark.read.format("xml").option("rowTag", "olympic_host").load(xml_file_path)

df_results = ps.read_html('app/data/input/olympic_results.html')[0]

df_results.show()