(ns api.core
  (:gen-class)
  (:require [ring.adapter.jetty :as jetty]
            [ring.middleware.resource :as resource]
            [compojure.core :refer :all]))

(defn staticHandler [request]
  {:status 200
   :headers {"Content-type" "text/html"}
   :body "Hello, World!"})

(defn jsonHandler [request]
  {:status 200
   :headers {"Content-type" "application/json"}
   :body "{\"message\": \"Hello, JSON!\"}"})

(defroutes my-routes
           (GET "/hello" [] staticHandler)
           (GET "/json" [] jsonHandler))

(def app
  (resource/wrap-resource my-routes "public"))

(defn -main
  [& args]
  (jetty/run-jetty app {:port 3000}))
