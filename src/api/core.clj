(ns api.core
  (:gen-class)
  (:require [ring.adapter.jetty :as jetty]
            [ring.middleware.resource :as resource]
            [compojure.core :refer :all]
            [ring.middleware.json :refer [wrap-json-response]]
            [ring.util.response :refer :all]
            [clojure.java.io :as io]
            [clojure.data.csv :as csv]
            ))

(defn staticHandler [request]
  (content-type (response "Hello, World!") "text/html"))

(defn jsonHandler [request]
  (response {:message "Hello, JSON!"}))

(defn tickerHandler [request]
  (response
    (with-open [reader (io/reader "data/VQvCQX-investor-obligacji.csv")]
      (doall (->> (csv/read-csv reader)
                  rest
                  (map #(take 2 %))
                  (map #(hash-map (first %) (second %))))))))

(defroutes my-routes
           (GET "/hello" [] staticHandler)
           (GET "/json" [] (wrap-json-response jsonHandler))
           (GET "/ticker" [] (wrap-json-response tickerHandler)))

(def app
  (resource/wrap-resource my-routes "public"))

(defn -main
  [& args]
  (jetty/run-jetty app {:port 3000}))
