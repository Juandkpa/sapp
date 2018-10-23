# **Ionic App**
## **Configuración Básica del proyecto.**

1. Verificamos instalación de nodejs
   ```
   $ node --v
   ```
   Debe aparecer la versión, algo como *v8.12.0*
   Si no aparece instalamos Node, desde la [página oficial](https://nodejs.org/es/),


2. Comando para crear el proyecto
   ```
   $ ionic start myApp
   ```
    Este comando nos presentará varias opciones de template que se pueden utilizar.
    - **tabs**: Proyecto con una interfaz simple de tabs.
    - **blank**: Proyecto vacío.
    - **sidemenu**: Proyecto con un menu lateral en el area de contexto.
    - **super**:Proyecto completo con paginas pre construidas, providers y buenas practicas de desarrollo en ionic.    
    - **tutorial**: Un proyecto tutorial que va junto con la documentación de ionic.
    - **aws** : Proyecto para conexión a servicios aws. 
  
    En este caso seleccionamos el tipo **blank**.

    Luego la instalación nos preguntará si queremos integrarnos con Cordova,
    ```
    $ Integrate your new app with Cordova to target native iOS and Android?
    ```
    Decidmos que si, pulsando la tecla y.
3. Abrimos la carpeta con la estructura que nos creo Ionic para el proyecto (en este caso la carpeta myApp) y nos dirijimos al archivo `app.modules.ts` ubicado en `src\app\` el cual contiene las declaraciones de todos los componentes que se utilizarán en la app. Cualquier componente o provider que creemos debe estar declarado en este archivo para que ionic lo pueda utilizar.
   
   Al crear el proyecto este archivo se verá algo como:

    ```typescript
    import { BrowserModule } from '@angular/platform-browser';
    import { ErrorHandler, NgModule } from '@angular/core';
    import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
    import { SplashScreen } from '@ionic-native/splash-screen';
    import { StatusBar } from '@ionic-native/status-bar';

    import { MyApp } from './app.component';
    import { HomePage } from '../pages/home/home';

    @NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}
    ```

    Se tienen los imports de los componentes de ionic y además un componente `HomePage` que ionic crea por defecto.
4. Corremos la app usando el comando ```$ionic lab ``` y veremos algo como.
    
    (FALTA IMAGEN)
6. En este caso creamos un proyecto en blanco, y vamos a crear una navegación con menu lateral para nuestra app así:

    - Primero en nuestro componente principal `app.component.ts` ubicado en `src\app\` importamos los componentes  `Nav` y `MenuController`  que se encuentran en `ionic-angular`  y `ViewChild` que hace parte de `@angular/core`.
    
        Además creamos un array donde vamos a guardar todas las páginas que queremos sean listadas en nuestro menu lateral. al final nuestro archivo debe verse algo asi:

        ```typescript
        import { Component, ViewChild } from '@angular/core';
        import { Platform,  MenuController, Nav } from 'ionic-angular';
        import { StatusBar } from '@ionic-native/status-bar';
        import { SplashScreen } from '@ionic-native/splash-screen';

        import { HomePage } from '../pages/home/home';
        @Component({
        templateUrl: 'app.html'
        })
        export class MyApp {
        @ViewChild(Nav) nav: Nav; //habilitar componente hijo
        rootPage:any = HomePage; //pagina inicial
        pages: Array<{title: string, component: any}>; //declaración de arreglo de páginas.

        constructor(
            public platform: Platform, 
            public statusBar: StatusBar, 
            public splashScreen: SplashScreen,    
            public menu: MenuController //injección del componente menu
        ) {
            this.initializateApp();
            this.buildPages();
        }

        //Class Methods

        initializateApp() {
            
            this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();           
            });
        }

        /*método que inicializa nuestro arreglo de páginas*/
        buildPages() {
            this.pages = [
            {title: 'Groups', component: HomePage},
            ]
        }

        openPage(page) {
            this.menu.close();
            this.nav.setRoot(page.component);
        }
        }

        ```
    - Luego, agregamos en el archivo app.html (que es el archivo principal de nuestra aplicación, donde se renderizaran los componentes) un componente [menu](https://ionicframework.com/docs/components/#menus) así: 
        ```html
        <ion-menu [content]="content">
        <ion-header>  
            <ion-toolbar>
                <ion-title>Music App</ion-title>          
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list>
            <button ion-item *ngFor="let p of pages" (click)="openPage(p)">
                {{p.title}}
            </button>
            </ion-list>
        </ion-content>
        </ion-menu>                    
        <ion-nav id="nav" #content [root]="rootPage" swipeBackEnabled="false"></ion-nav>

        ```
        Aquí estamos creando un menu, ```<ion-header>``` será la cabecera de este menu, y dentro de ```<ion-content>``` tenemos una lista ```<ion-list>``` de botones que nos daran acceso a cada una de las páginas que definamos para nuestra app.
        La directiva [*ngFor](https://angular.io/guide/displaying-data) de angular, nos permite iterar sobre el arreglo de páginas que tenemos en nuestro componente `app.component.ts` y renderizar el botón respectivo.
        En cada botón tenemos un método ```(click)``` que nos permitirá mostrar la página respectiva.

        Luego de esta configuración nuestra app deberia verse algo como:

        (FALTA FOTO)

## **Conectando nuestra app a un Api Restful**
Ahora para la gestión de la información dentro de nuestra app (musicApp), vamos a hacer una conexión a una apí restful, primero vamos a utilizar una api sencilla de pruebas basada en un objeto json para con ella aprender el uso del modulo HttpClient y la librería Rxjs disponibles en Ionic y además el uso de providers como buena practica de desacoplamiento y reutilización de código.

Continuemos :) ..
### **Creando api restful de pruebas.**

1. Creamos un archivo db.json en el root de nuestro proyecto, con el siguiente contenido.
    ```
    {
    "groups": [
        {
        "id": 1,
        "name": "Queen",
        "fragment": "Queen es una banda británica de rock formada en 1970 en Londres por el cantante Freddie Mercury, el guitarrista Brian May, el baterista Roger Taylor y el bajista John Deacon.",
        "image": "https://cdn-images-1.medium.com/max/1200/0*sUYztIAGGLmJDtGy.jpg"
        },
        {
        "id": 2,
        "name": "Oasis",
        "fragment": "Cool Band",
        "image": "http://www.gamba.fm/wp/wp-content/uploads/2018/09/Oasis.jpg"
        }
    }

    ```
    Este archivo hará las veces de base de datos para nuestra api de pruebas.

2. Instalamos el paquete `json-server` disponible npm el cual nos proveera un servidor de pruebas sencillo con los diferentes endpoints para el manejo del crud de los grupos musicales que manejaremos en nuestra app.
    ```
    $ npm install json-server --save--dev
    ```
    Luego podemos inicializar el server con el comando

    ```
    $ json-server --watch db.json
    ```
    Si ahora vamos a la ruta `http://localhost:3000/groups, en nuestro navegador, podremos ver un json con la información que guardamos en nuestro archivo db.json. y además el server nos habilita los siguientes endpoints.

    - GET `/groups`: obtiene todos los grupos disponibles.
    - GET `/groups/:id`: obtiene el groupo con ese id.
    - POST `/groups`: crea un nuevo grupo.
    - PUT `/groups/:id`: actualiza el grupo con ese id.
    - DELETE `/groups/:id` : elimina el grupo con ese id.
    

### **HttpClient**
Los llamados a Api usando HttpClient, son asincronos por naturaleza, lo que significa que debemos esperar a que la respuesta del servidor llegue y mientras tanto el flujo del programa debe continuar.

Una solicitud HTTP puede tardar algún tiempo mientras llega al servidor del Api y también la respuesta HTTP necesitará tiempo para llegar, por esto esto debe ser ejecutado en el background, antes que la información este lista para ser procesada.

Con Ionic/Angular, podemos hacer uso de las últimas apis de Javascript: **Promesas** y **Observables** las cuales proveen un nivel alto de abstracción para manejar la naturaleza asincrona de las peticiones al servidor u otras operaciones que tomen su tiempo en terminar.

El modulo httpClient de la versión 3 de ionic hace uso de los observables por defecto, los cuales son un estandar más reciente añadidos en angular 2+ y ES7 y que nos permiten manejar casos de uso más avanzados con codigo conciso y claro.
Por ejemplo podemos cancelar un observable cuando se necesite cosa que no se podía hacer con las promesas sin agregar nuevas librearias.

**Observables**

Un observable puede ser entendido como un flujo de eventos que pueden ser manejados con la misma API y que además pueden ser cancelables.

Sobre el se pueden usar diferentes operadores de array, como `map()`, `forEach()`, `reduce()` etc, esto para manejar casos de uso avanzados de manera fácil y clara.

**Configurando HttpClient**

Para que nuestra app pueda usar el módulo HttpClient, lo unico que necesitamos hacer es en el archivo `src/app/app.module.ts`  importarlo 
```typescript
    import { HttpClientModule } from '@angular/common/http';
```
y luego añadirlo al array de imports en nuestro

```typescript
    imports: [
        BrowserModule,
        HttpClientModule,
        IoniModule.forRoot(MyApp)
    ]
```  
### **Service Providers**
Un service provider es una abstracción de angular que puede ser usada en cualquier otro componente, página o servicio por medio de la injección de dependencias de Angular (DI).
Podemos usar providers para encapsular código común a muchos lugares de la aplicación, así en lugar de repetirlo cada vez, podemos aislarlo en un mismo lugar e inyectarlo en todos los lugares que lo necesitemos, cumpliendo así el principio de dont' repeat yoursefl [(DRY)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

Ahora creemos nuestra interfaz de servicios para conectarnos con nuestro servidor api de pruebas.

Para ello vamos a crear un provider con el siguiente commando en la consola.
```
$ ionic g provider rest
```

Este comando nos creará una nueva carpeta llamada providers, con una clase RestProvider donde manejaremos la lógica de peticiones http y agregará nuestro recien creado provider a la lista de providers en `app.modules.ts`.

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

}
```
**Implementación**

Ahora vamos a implementar el primer servicio, en este caso necesitamos traer la lista de todos los grupos disponibles en el servidor api de pruebas creado anteriormente para mostrarlos en la vista principal de nuestra app, para ello hacemos uso del endpoint `http://localhost:3000/groups` con el verbo GET que vimos anteriormente.

Nos aseguramos que el módulo httpClient haya sido importado en nuestro provider, de no ser así lo añadimos de la siguiente manera:

```typescript
    import { HttpClient } from '@angular/common/http';
```
Además necesitamos usar unas funcionalidades y operadores provistas por la librería (rxjs)[https://rxjs-dev.firebaseapp.com/guide/overview] para el manejo de observables, para ello las importamos de la siguiente manera:

```typescript
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";
```
Luego creamos un módelo para manejar la lógica de nuestros grupos así:

```typescript
export class Group {
  id: number;
  name: string;
  fragment: string;
  image: string;
  constructor(values: Object = {}) {
       Object.assign(this, values);
  }
}
```

Finalmente creamos el método `getGroups()` en nuestro provider `providers/rest/rest.ts` 
con el siguiente código:

```typescript
  public getGroups() : Observable<Group[]>  {
    return this.http
      .get('http://localhost:3000/groups')
      .pipe(        
        map (ans => Object.keys(ans).map(k=> new Group(ans[k])))
      )
  }
```
En este caso estamos haciendo uso del método get, del módulo httpClient, que nos permite hacer peticiones al servidor con el verbo get y devuelve un observable.
La libería rxjs tiene varios operadores para el manejo de observables aquí estamos usando el metódo pipe, que recibe n funciones por las cuales va a ser pasado el observable y lo van a transformar, en este caso usamos el operador map, que lo que hace es mapear cada uno de los elementos de la respuesta a un objeto de la clase Group que creamos anteriormente.


Una vez tenemos disponible nuestro provider junto con nuestro primer servicio, podemos hacer uso de el para mostrar en el componente principal la lista de grupos retornados.

Entonces para usar el provider lo importamos en el componente `src/pages/home/home.ts/` y además el modelo que creamos para manejar nuestros grupos, así:

```typescript
import { RestProvider, Group  } from '../../providers/rest/rest';
```

Luego en nuestra clase HomePage, agregamos una lista tipo Group donde vamos a guardar el resultado de la petición get.
```typescript
    private groups : Group[];
```
y luego hacemos un método `getGroups()` que se encargara de usar nuestro provider para traer los grupos disponibles en el servidor y asignarlos a nuestro array de grupos, para luego ser renderizados en la vista.

```typescript
  getGroups() {
    const loader = this.loadingCtrl.create({
      spinner: 'bubbles'      
    })
    loader.present();
    this.restProvider
      .getGroups()
      .subscribe(
        (groups : Group[]) => {
          this.groups = groups;
          loader.dismiss();
          console.warn("groups >> ", this.groups);
        },
        (err) => {
          loader.dismiss();
          console.error(err);
        }
      )
  }
```

Agregamos un (loader)[https://ionicframework.com/docs/components/#loading] como indicador de que la petición está en progreso y lo cerramos una vez la petición haya terminado.

Como el servicio `getGroups()` de nuestro provider retorna un observable, debemos hacer uso del método subscribe para tener acceso a la lista de grupos.

Por último vamos a renderizar de manera agradable la lista de grupos disponibles, por ejemplo podríamos utilizar el componente (cards)[https://ionicframework.com/docs/components/#cards] modificando el archivo `src\pages\home\home.html` así:

```html
<ion-header>
    <ion-navbar>
        <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>Groups</ion-title>
    </ion-navbar>
</ion-header>
<ion-content>        
    <ion-card *ngFor="let g of groups">              
        <img src="{{g.image}}">            
        <ion-card-content>               
        <ion-card-title>
            {{g.name}}
        </ion-card-title>
        <p>
            {{g.fragment}}
        </p>
        </ion-card-content>
        <ion-row no-padding>
            <ion-col>
            <button ion-button clear small color="danger" icon-start>
                <ion-icon name='star'></ion-icon>
                Favorite
            </button>
            </ion-col>
            <ion-col text-center>
            <button ion-button clear small color="danger" icon-start>
                <ion-icon name='musical-notes'></ion-icon>
                Listen
            </button>
            </ion-col>
            <ion-col text-right>
            <button ion-button clear small color="danger" icon-start>
                <ion-icon name='share-alt'></ion-icon>
                Share
            </button>
            </ion-col>
        </ion-row>
    </ion-card>
    </ion-content>
```



## **Se deja como ejercicio implementar todas las acciones crud para los grupos, utilizando los demás endpoints disponibles :)**
    
    


   

