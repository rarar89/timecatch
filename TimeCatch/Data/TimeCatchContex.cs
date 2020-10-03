using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TimeCatch.Models;

namespace TimeCatch.Data
{
    public class TimeCatchContex : DbContext
    {
        public TimeCatchContex(DbContextOptions<TimeCatchContex> options)
            : base(options)
        {
        }

        public DbSet<TimeRegistration> TimeRegistration { get; set; }
        public DbSet<Client> Client { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TimeRegistration>().ToTable("TimeRegistration");
            modelBuilder.Entity<Client>().ToTable("Client");

        }
    }

}
