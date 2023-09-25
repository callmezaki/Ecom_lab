package com.tcshop.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

//    private EntityManager entityManager;
//
//    @Autowired
//    public  MyDataRestConfig(EntityManager theEntityManager){
//        entityManager = theEntityManager;
//    }
//
//    @Override
//    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
//        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
//        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
//
//        disableHttpMethods(Product.class,config, theUnsupportedActions);
//        disableHttpMethods(ProductCategory.class,config, theUnsupportedActions);
//
//        disableHttpMethods(Country.class,config, theUnsupportedActions);
//        disableHttpMethods(State.class,config, theUnsupportedActions);
//        // call and internal helper method
//        exposeIds(config);
//    }
//
//    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
//        //disable http method for productCategory: put,post and delete
//        config.getExposureConfiguration()
//                .forDomainType(theClass)
//                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
//                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
//    }
//
//    private void exposeIds(RepositoryRestConfiguration config) {
//        //expose entity ids
//        //get a list of all entity classes from the entity manager
//        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
//        //create an array of the entity types
//        List<Class> entityClasses = new ArrayList<>();
//        //get the entity types for the entities
//        for(EntityType tempEntityType : entities){
//            entityClasses.add(tempEntityType.getJavaType());
//        }
//        //Expose the entity ids for the array of entity/domain types
//        Class[] domainTypes = entityClasses.toArray(new Class[0]);
//        config.exposeIdsFor(domainTypes);
//
//    }
}