import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
    { path: 'home',             component: HomeComponent },
    { path: 'about',          component: AboutComponent },
    { path: 'blog',           component: BlogComponent },
    { path: 'contact',          component: ContactComponent },
    { path: 'projects',      component: ProjectsComponent },
    { path: 'services',      component: ServicesComponent },
    { path: 'main',      component: MainComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
