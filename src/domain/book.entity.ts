/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { ApiModelProperty } from "@nestjs/swagger";

/**
 * A Book.
 */
@Entity("book")
export default class Book extends BaseEntity {
  @Column({ name: "title" })
  title: string;

  @Column({ name: "author" })
  author: string;

  @Column({ name: "isbn" })
  isbn: string;

  @Column({ type: "double", name: "price" })
  price: number;

  @Column({ type: "date", name: "published" })
  published: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
