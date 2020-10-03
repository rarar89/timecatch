using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TimeCatch.Models
{
    public class Client
    {
        public int Id { get; set; }

        public string ClientName { get; set; }

        [NotMapped]
        public int TotalTimeSpent { get; set; }

        public ICollection<TimeRegistration> TimeRegistrations { get; set; }
    }
}
