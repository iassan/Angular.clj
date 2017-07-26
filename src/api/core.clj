(ns api.core
  (:gen-class)
  (:require [ring.adapter.jetty :as jetty]
            [ring.middleware.resource :as resource]))

(defn handler [request]
  {:status 200
   :headers {"Content-type" "text/html"}
   :body "Hello, World!"})

(def app
  (resource/wrap-resource handler "public"))

(defn -main
  [& args]
  (jetty/run-jetty app {:port 3000}))
